import { DEPTH_LAYERS } from "./stack-journey.config"

/**
 * One stack logo with real thickness: a stack of masked layers offset along z
 * inside a `preserve-3d` box, so turning it shows an edge instead of a flat
 * image flipping over.
 *
 * The silhouette comes from the same monochrome SVG the skills grid uses, but
 * as a CSS mask rather than an <img>: that way each layer carries its own
 * colour without a filter, and the mask stays on the leaves — masking the
 * parent would flatten the 3D subtree.
 */
export function StackLogo({ src, index }: { src: string; index: number }) {
  return (
    <div className="stack-logo" data-logo={index}>
      {DEPTH_LAYERS.map((layer) => (
        <span
          key={layer.z}
          className="stack-logo-layer"
          style={{
            transform: `translateZ(${layer.z}px)`,
            background: layer.tone,
            maskImage: `url(${src})`,
            WebkitMaskImage: `url(${src})`,
          }}
        />
      ))}
    </div>
  )
}
