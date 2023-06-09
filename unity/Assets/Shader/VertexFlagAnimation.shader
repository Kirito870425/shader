Shader "ShaderDevelopmentUsingUnity/VertexFlagAnimationShader"
{
    Properties
    {
        _MainTex ("Texture", 2D) = "white" {}
        _Speed("Wave Speed",Float) = 1
        _Frequency("Wave frequency", Float) = 1
        _Amplitude("Wave Amplitude", Float) = 1
    }
    SubShader
    {
        Tags { "RenderType"="Opaque" }
        LOD 100

        Pass
        {
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
            float _Frequency;
            float _Amplitude;
            float _Speed ;
            
            float4 vertexFlagAnim(float4 vertPosition, float2 uv)
            {
                vertPosition.y += sin((uv.y + _Time.y *_Speed)* _Frequency ) *( _Amplitude * uv.y);
                return vertPosition;
            }

            v2f vert (appdata v)
            {
                v2f o;

                v.vertex = vertexFlagAnim(v.vertex,v.uv);
                o.vertex = UnityObjectToClipPos(v.vertex);
               
                o.uv = TRANSFORM_TEX(v.uv, _MainTex);
                UNITY_TRANSFER_FOG(o,o.vertex);
                return o;
            }

            fixed4 frag (v2f i) : SV_Target
            {
                // sample the texture
                fixed4 col = tex2D(_MainTex, i.uv);
                // apply fog
                UNITY_APPLY_FOG(i.fogCoord, col);
                return col;
            }
            ENDCG
        }
    }
}