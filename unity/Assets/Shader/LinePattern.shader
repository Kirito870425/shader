Shader "Unlit/LinePatternShader"
{
    Properties
    {
        _MainTex ("Texture", 2D) = "white" {}
        _StartToEndValue("Start Value And End Value",Vector) = (0.4,0.6,0,0) 
    }
    SubShader
    {
        Tags { "RenderType"="Opaque"  "Queue" = "Transparent"}
        LOD 100

        Pass
        {
            ZWrite Off
            Blend SrcAlpha OneMinusSrcAlpha
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            // make fog work
            #pragma multi_compile_fog

            #include "UnityCG.cginc"

            struct appdata
            {
                float4 vertex : POSITION;
                float2 uv : TEXCOORD0;
            };

            struct v2f
            {
                float2 uv : TEXCOORD0;
                UNITY_FOG_COORDS(1)
                float4 vertex : SV_POSITION;
            };

            sampler2D _MainTex;
            float4 _MainTex_ST;
            float4 _StartToEndValue;
            v2f vert (appdata v)
            {
                v2f o;
                o.vertex = UnityObjectToClipPos(v.vertex);
                o.uv = TRANSFORM_TEX(v.uv, _MainTex);
                UNITY_TRANSFER_FOG(o,o.vertex);
                return o;
            }

            float drawLine(float2 texcoord)
            {
            bool straightLine = texcoord.x<_StartToEndValue.y && texcoord.x>_StartToEndValue.x;
            bool horizontalLine = texcoord.y<_StartToEndValue.z && texcoord.y>_StartToEndValue.w;
            if(straightLine|| horizontalLine)
            {
                return 1;
            }
            else
            {
                return 0;
            }
            }
            fixed4 frag (v2f i) : SV_Target
            {
                // sample the texture
                fixed4 col = tex2D(_MainTex, i.uv);
                // apply fog
                UNITY_APPLY_FOG(i.fogCoord, col);
                col.a = drawLine(i.uv);
                return col;
            }
            
            ENDCG
        }
    }
}