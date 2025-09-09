type VariantProps<T> = T extends (...args: any[]) => any ? Parameters<T>[0] : never

type ClassValue = string | number | boolean | undefined | null | ClassValue[]

function cn(...classes: ClassValue[]): string {
  return classes.flat().filter(Boolean).join(" ").trim()
}

function cva(
  base: string,
  config?: {
    variants?: Record<string, Record<string, string>>
    defaultVariants?: Record<string, string>
  },
) {
  return (props?: Record<string, any>) => {
    let result = base

    if (config?.variants && props) {
      Object.entries(config.variants).forEach(([key, variants]) => {
        const value = props[key] || config.defaultVariants?.[key]
        if (value && variants[value]) {
          result += " " + variants[value]
        }
      })
    }

    return result
  }
}

export { cva, cn, type VariantProps }
