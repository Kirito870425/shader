Shader "Unlit/Circle"
{
    Properties
    {
        _MainTex ("Texture", 2D) = "white" {}
        _StartToEndValue("Start Value And End Value",Vector) = (0.4,0.6,0,0) 

        _Radius("_Radius",float)= 0
        _Center("_Center",Vector)= (0,0,0,0)

        _Speed("Speed",float)=0
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

           
            // float _Radius;
            // float4 _Center;
            // float drawCircle(float2 texcoord)
            // {
            //     float r = (texcoord.x - _Center.x)*(texcoord.x - _Center.x)+ (texcoord.y - _Center.y)*(texcoord.y - _Center.y);
            //     bool state = r<=_Radius;
            //     if(state)
            //     {
            //         return 1;
            //     }
            //     else
            //     {
            //         return 0;
            //     }
            // }

            
            // float _Radius;
            // float4 _Center;
            // float drawCircle(float2 texcoord)
            // {
            //     float r = (texcoord.x - _Center.x)*(texcoord.x - _Center.x)+ (texcoord.y - _Center.y)*(texcoord.y - _Center.y);
            //     bool state = r<=_Radius;
            //     if(r<=_Radius/2)
            //     {
            //         return 1;
            //     }
            //     if(r<=_Radius && r>=_Radius/2)
            //     {
            //         return  smoothstep(_Radius,_Radius/2,r);
            //     }
            //     else
            //     {
            //         return  0;
            //     }
            // }

            float _Radius;
            float4 _Center;
            float _Speed;
            float drawCircle(float2 texcoord)
            {
                float r = (texcoord.x - _Center.x)*(texcoord.x - _Center.x)+ (texcoord.y - _Center.y)*(texcoord.y - _Center.y);
                bool state = r<=_Radius;
                if(r<=_Radius)
                {
                    return smoothstep(0,_Radius,r);
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
                col.a = drawCircle(i.uv) * sin(_Time.y * _Speed);
                return col;
            }
            
            ENDCG
        }
    }
}