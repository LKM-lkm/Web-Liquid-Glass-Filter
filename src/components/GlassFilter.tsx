import React, { useMemo } from 'react';
import { gu, yu, xu, vu, De, Tu } from '../lib/glass-logic';

interface GlassFilterProps {
  id: string;
  width: number;
  height: number;
  radius?: number;
  blur?: number;
  glassThickness?: number;
  bezelWidth?: number;
  refractiveIndex?: number;
  scaleRatio?: number;
  specularOpacity?: number;
  specularHardness?: number;
  refractionSaturation?: number;
  magnifyingScale?: number;
  colorScheme?: 'light' | 'dark';
  dpr?: number;
}

export const GlassFilter: React.FC<GlassFilterProps> = ({
  id,
  width,
  height,
  radius = 20,
  blur = 4,
  glassThickness = 10,
  bezelWidth = 40,
  refractiveIndex = 1.5,
  scaleRatio = 1,
  specularOpacity = 0.5,
  specularHardness = 2,
  refractionSaturation = 1.2,
  magnifyingScale,
  colorScheme,
  dpr = window.devicePixelRatio || 1
}) => {
  const bezelHeightFn = Tu.fn;

  // 1. Calculate displacement map
  const x = useMemo(() => gu(glassThickness, bezelWidth, bezelHeightFn, refractiveIndex), 
    [glassThickness, bezelWidth, refractiveIndex]);
    
  const p = useMemo(() => Math.max(...x.map(q => Math.abs(q))), [x]);
  
  const P = useMemo(() =>
    yu(width, height, width, height, radius, bezelWidth, p, x, dpr),
    [width, height, radius, bezelWidth, p, x, dpr]
  );
  
  const b = useMemo(() => De(P), [P]);

  // 2. Calculate specular layer
  // User logic uses bezelWidth (or a fix value 50) for the s parameter
  const T = useMemo(() => xu(width, height, radius, bezelWidth, 1.047, dpr, specularHardness), 
    [width, height, radius, bezelWidth, dpr, specularHardness]);
    
  const M = useMemo(() => De(T), [T]);

  // 3. Magnifying displacement map
  const A = useMemo(() => magnifyingScale !== undefined ? vu(width, height) : undefined, 
    [magnifyingScale, width, height]);
    
  const V = useMemo(() => A ? De(A) : undefined, [A]);

  const C = p * scaleRatio;

  // Color schemas (if needed)
  const darkMatrix = "0.8 0 0 0 0  0 0.8 0 0 0  0 0 0.8 0 0  0 0 0 1 0";
  const lightMatrix = "1.2 0 0 0 0  0 1.2 0 0 0  0 0 1.2 0 0  0 0 0 1 0";

  return (
    <svg style={{ display: "none" }} colorInterpolationFilters="sRGB">
      <defs>
        <filter id={id} x="-50%" y="-50%" width="200%" height="200%">
          {/* Magnifying layer */}
          {magnifyingScale !== undefined && V && (
            <>
              <feImage href={V} result="magnifying_displacement_map" x="0" y="0" width={width} height={height} />
              <feDisplacementMap
                in="SourceGraphic"
                in2="magnifying_displacement_map"
                scale={magnifyingScale}
                xChannelSelector="R"
                yChannelSelector="G"
                result="magnified_source"
              />
            </>
          )}

          {/* Color Scheme Adjustment */}
          {colorScheme && (
            <feColorMatrix
              in={magnifyingScale !== undefined ? "magnified_source" : "SourceGraphic"}
              type="matrix"
              values={colorScheme === 'dark' ? darkMatrix : lightMatrix}
              result="brightened_source"
            />
          )}

          {/* Core Pipeline */}
          <feGaussianBlur
            in={colorScheme ? "brightened_source" : magnifyingScale !== undefined ? "magnified_source" : "SourceGraphic"}
            stdDeviation={blur}
            result="blurred_source"
          />

          <feImage href={b} result="displacement_map" x="0" y="0" width={width} height={height} />

          <feDisplacementMap
            in="blurred_source"
            in2="displacement_map"
            scale={C}
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"
          />

          <feColorMatrix
            in="displaced"
            type="saturate"
            values={refractionSaturation.toString()}
            result="displaced_saturated"
          />

          <feImage href={M} result="specular_layer" x="0" y="0" width={width} height={height} />

          <feComposite
            in="displaced_saturated"
            in2="specular_layer"
            operator="in"
            result="specular_saturated"
          />

          <feComponentTransfer in="specular_layer" result="specular_faded">
            <feFuncA type="linear" slope={specularOpacity} />
          </feComponentTransfer>

          <feBlend in="specular_saturated" in2="displaced" mode="normal" result="withSaturation" />
          <feBlend in="specular_faded" in2="withSaturation" mode="normal" />
        </filter>
      </defs>
    </svg>
  );
};
