"use client"

import { ElementType, memo } from "react"
import { AnimatePresence, motion, type Variants } from "framer-motion"

import { cn } from "@/lib/utils"

type AnimationType = "text" | "word" | "character" | "line"
type AnimationVariant =
  | "fadeIn"
  | "blurIn"
  | "blurInUp"
  | "slideUp"
  | "scaleUp"

interface TextAnimateProps {
  children: string
  className?: string
  segmentClassName?: string
  style?: React.CSSProperties
  delay?: number
  duration?: number
  variants?: Variants
  as?: ElementType
  by?: AnimationType
  startOnView?: boolean
  once?: boolean
  animation?: AnimationVariant
  accessible?: boolean
}

const staggerTimings: Record<AnimationType, number> = {
  text: 0.06,
  word: 0.05,
  character: 0.03,
  line: 0.06,
}

const defaultItemAnimationVariants: Record<
  AnimationVariant,
  { container: Variants; item: Variants }
> = {
  fadeIn: {
    container: {
      hidden: { opacity: 1 },
      show: {
        opacity: 1,
        transition: { delayChildren: 0, staggerChildren: 0.05 },
      },
    },
    item: {
      hidden: { opacity: 0, y: 20 },
      show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
      exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
    },
  },
  blurIn: {
    container: {
      hidden: { opacity: 1 },
      show: {
        opacity: 1,
        transition: { delayChildren: 0, staggerChildren: 0.05 },
      },
    },
    item: {
      hidden: { opacity: 0, filter: "blur(10px)" },
      show: {
        opacity: 1,
        filter: "blur(0px)",
        transition: { duration: 0.3 },
      },
      exit: {
        opacity: 0,
        filter: "blur(10px)",
        transition: { duration: 0.3 },
      },
    },
  },
  blurInUp: {
    container: {
      hidden: { opacity: 1 },
      show: {
        opacity: 1,
        transition: { delayChildren: 0, staggerChildren: 0.08 },
      },
    },
    item: {
      hidden: { opacity: 0, filter: "blur(12px)", y: 24 },
      show: {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        transition: {
          y: { duration: 0.35 },
          opacity: { duration: 0.4 },
          filter: { duration: 0.35 },
        },
      },
      exit: {
        opacity: 0,
        filter: "blur(12px)",
        y: 24,
        transition: {
          y: { duration: 0.35 },
          opacity: { duration: 0.4 },
          filter: { duration: 0.35 },
        },
      },
    },
  },
  slideUp: {
    container: {
      hidden: { opacity: 1 },
      show: {
        opacity: 1,
        transition: { delayChildren: 0, staggerChildren: 0.05 },
      },
    },
    item: {
      hidden: { y: 20, opacity: 0 },
      show: { y: 0, opacity: 1, transition: { duration: 0.3 } },
      exit: { y: -20, opacity: 0, transition: { duration: 0.3 } },
    },
  },
  scaleUp: {
    container: {
      hidden: { opacity: 1 },
      show: {
        opacity: 1,
        transition: { delayChildren: 0, staggerChildren: 0.05 },
      },
    },
    item: {
      hidden: { scale: 0.5, opacity: 0 },
      show: {
        scale: 1,
        opacity: 1,
        transition: {
          duration: 0.3,
          scale: { type: "spring", damping: 15, stiffness: 300 },
        },
      },
      exit: {
        scale: 0.5,
        opacity: 0,
        transition: { duration: 0.3 },
      },
    },
  },
}

const componentMap = {
  p: motion.p,
  h1: motion.h1,
  h2: motion.h2,
  span: motion.span,
  div: motion.div,
} as const

const TextAnimateBase = ({
  children,
  delay = 0,
  duration = 0.3,
  variants,
  className,
  segmentClassName,
  style,
  as: Component = "p",
  startOnView = true,
  once = true,
  by = "word",
  animation = "blurInUp",
  accessible = true,
}: TextAnimateProps) => {
  const MotionComponent =
    componentMap[Component as keyof typeof componentMap] ?? motion.span

  let segments: string[] = []
  switch (by) {
    case "word":
      segments = children.split(/(\s+)/)
      break
    case "character":
      segments = children.split("")
      break
    case "line":
      segments = children.split("\n")
      break
    case "text":
    default:
      segments = [children]
      break
  }

  const anim = animation ? defaultItemAnimationVariants[animation] : null
  const finalVariants = variants
    ? {
        container: {
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              opacity: { duration: 0.01, delay },
              delayChildren: delay,
              staggerChildren: duration / Math.max(segments.length, 1),
            },
          },
        },
        item: variants,
      }
    : anim
      ? {
          container: {
            ...anim.container,
            show: {
              ...anim.container.show,
              transition: {
                delayChildren: delay,
                staggerChildren:
                  by === "word"
                    ? 0.1
                    : by === "character"
                      ? 0.03
                      : duration / Math.max(segments.length, 1),
              },
            },
          },
          item: anim.item,
        }
      : null

  if (!finalVariants) return <>{children}</>

  return (
    <AnimatePresence mode="popLayout">
      <MotionComponent
        variants={finalVariants.container}
        initial="hidden"
        whileInView={startOnView ? "show" : undefined}
        animate={startOnView ? undefined : "show"}
        viewport={{ once }}
        className={cn("whitespace-pre-wrap overflow-visible", className)}
        style={{ ...style, overflow: "visible" }}
        aria-label={accessible ? children : undefined}
      >
        {accessible && <span className="sr-only">{children}</span>}
        {segments.map((segment, i) => (
          <motion.span
            key={`${by}-${segment}-${i}`}
            variants={finalVariants.item}
            custom={i * staggerTimings[by]}
            className={cn(
              by === "line" ? "block" : "inline-block whitespace-pre",
              "overflow-visible",
              segmentClassName
            )}
            style={{ overflow: "visible" }}
            aria-hidden={accessible}
          >
            {segment}
          </motion.span>
        ))}
      </MotionComponent>
    </AnimatePresence>
  )
}

export const TextAnimate = memo(TextAnimateBase)
