'use client';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';
import {
  Activity,
  CheckCircle2,
  MoonStar,
  Rocket,
  Sparkles,
  SunMedium,
  Waves,
} from 'lucide-react';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import {
  useCounter,
  useDarkMode,
  useInterval,
  useMediaQuery,
} from 'usehooks-ts';

const buttonStyles = cva(
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90',
        outline:
          'border border-border bg-card text-foreground hover:bg-accent hover:text-foreground',
        ghost: 'text-foreground hover:bg-accent',
      },
      size: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-5 py-2.5 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonStyles> & {
    asChild?: boolean;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, ...props }, ref) => {
    const Component = asChild ? Slot : 'button';
    return (
      <Component
        ref={ref as never}
        className={twMerge(buttonStyles({ variant, size }), className)}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

const badgeStyles = cva(
  'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold tracking-wide uppercase',
  {
    variants: {
      tone: {
        success: 'border-emerald-400/60 text-emerald-600 dark:text-emerald-300',
        info: 'border-sky-400/60 text-sky-600 dark:text-sky-200',
        subtle: 'border-border text-foreground',
      },
    },
    defaultVariants: { tone: 'info' },
  }
);

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeStyles>;

const Badge = ({ className, tone, children, ...props }: BadgeProps) => (
  <span className={twMerge(badgeStyles({ tone }), className)} {...props}>
    {children}
  </span>
);

const surfaceStyles = cva(
  'rounded-3xl border border-border/60 bg-card/60 p-6 shadow-sm backdrop-blur-md transition-all duration-300',
  {
    variants: {
      elevated: {
        true: 'hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10',
        false: '',
      },
    },
    defaultVariants: { elevated: true },
  }
);

type SurfaceProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof surfaceStyles>;

const Surface = ({ className, elevated, children, ...props }: SurfaceProps) => (
  <div className={twMerge(surfaceStyles({ elevated }), className)} {...props}>
    {children}
  </div>
);

const features = [
  {
    title: 'Instant PWA Ready',
    description:
      'Service worker, manifest, and offline-first defaults tuned for modern UX.',
    icon: <Rocket className="size-6" />,
  },
  {
    title: 'Animation Utilities',
    description:
      'Tailwind v4 + tw-animate-css gives lively entrances and micro-interactions.',
    icon: <Waves className="size-6" />,
  },
  {
    title: 'Composable Styling',
    description:
      'cva + clsx + tailwind-merge keep variants tidy and conflict-free.',
    icon: <Sparkles className="size-6" />,
  },
  {
    title: 'Dark Mode Aware',
    description:
      'usehooks-ts dark-mode helper respects system preferences automatically.',
    icon: <MoonStar className="size-6" />,
  },
];

const checklist = [
  'Tree-shaken Lucide icons',
  'Client-only toggles with Slot for asChild',
  'Typed variants with cva and tailwind-merge',
  'Responsive hooks from usehooks-ts',
];

const gradientBg =
  'relative overflow-hidden rounded-[32px] border border-border bg-gradient-to-br from-primary/10 via-card to-accent/40 px-8 py-10 shadow-lg shadow-primary/10';

export default function Home() {
  const { isDarkMode, toggle } = useDarkMode();
  const prefersReducedMotion = useMediaQuery(
    '(prefers-reduced-motion: reduce)'
  );
  const { count, increment, reset } = useCounter(128);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    const body = document.body;
    root.classList.toggle('dark', isDarkMode);
    body.classList.toggle('dark', isDarkMode);
    root.style.colorScheme = isDarkMode ? 'dark' : 'light';
  }, [isDarkMode, mounted]);

  useInterval(() => increment(), prefersReducedMotion ? null : 1800);

  const heroAnimation = prefersReducedMotion
    ? ''
    : 'animate-in fade-in slide-in-from-bottom-6 duration-700';

  const cardsAnimation = prefersReducedMotion
    ? ''
    : 'animate-in fade-in zoom-in duration-500';

  return (
    <main className="bg-gradient-to-b from-background via-background/80 to-accent/20 px-6 py-12 text-foreground sm:px-10 lg:px-16">
      <section className={clsx('mx-auto max-w-5xl space-y-10', heroAnimation)}>
        <div className="flex items-center justify-between gap-4">
          <Badge
            className="animate-in fade-in slide-in-from-left-6"
            tone="info"
          >
            <Sparkles className="size-4" />
            {'Modern Next 16 + React 19 stack'}
          </Badge>
          <Button
            aria-label="Toggle color theme"
            className="animate-in fade-in slide-in-from-right-6"
            size="sm"
            variant="ghost"
            onClick={toggle}
          >
            {isDarkMode ? (
              <SunMedium className="size-4" />
            ) : (
              <MoonStar className="size-4" />
            )}
            {isDarkMode ? 'Light mode' : 'Dark mode'}
          </Button>
        </div>

        <div className={gradientBg}>
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,theme(colors.primary/20),transparent_45%),radial-gradient(circle_at_80%_10%,theme(colors.chart-2/25),transparent_35%),radial-gradient(circle_at_50%_80%,theme(colors.chart-3/25),transparent_35%)]" />
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-card/60 px-3 py-1 text-sm font-medium text-foreground shadow-sm">
                <Activity className="size-4 text-primary" />
                {'Live showcase of installed libraries'}
              </div>
              <h1 className="text-4xl leading-tight font-bold text-balance sm:text-5xl">
                {'Build PWA-grade experiences without leaving this file.'}
              </h1>
              <p className="max-w-2xl text-lg text-muted-foreground">
                {
                  'This client component stays self-contained, demonstrating Radix Slot, CVA variants,'
                }
                {
                  'class merging, Lucide icons, hooks from usehooks-ts, and Tailwind v4 utilities with'
                }
                {'tw-animate-css motion.'}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button className="shadow-lg shadow-primary/20" size="lg">
                  <Rocket className="size-5" />
                  {'Launch demo'}
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a className="flex items-center gap-2" href="#deep-dive">
                    <CheckCircle2 className="size-5" />
                    {'View guarantees'}
                  </a>
                </Button>
              </div>
              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                {checklist.map((item) => (
                  <div
                    key={item}
                    className={twMerge(
                      'inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/70 px-3 py-2 shadow-sm',
                      cardsAnimation
                    )}
                  >
                    <CheckCircle2 className="size-4 text-emerald-500" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <Surface className="w-full max-w-sm space-y-6 bg-card/70">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    {'Active installs'}
                  </p>
                  <p className="text-4xl font-bold tracking-tight">
                    {count.toLocaleString()}
                  </p>
                </div>
                <div className="rounded-full bg-primary/10 p-3">
                  <Sparkles className="size-6 text-primary" />
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => increment()}>
                  {'Boost'}
                </Button>
                <Button size="sm" variant="outline" onClick={() => reset()}>
                  {'Reset'}
                </Button>
              </div>
              <div className="rounded-2xl bg-gradient-to-r from-chart-2/15 via-card to-chart-1/15 p-4 text-sm text-muted-foreground">
                {
                  'Counter is driven by usehooks-ts helpers: `useCounter` and `useInterval`, respecting'
                }
                {'reduced-motion preferences via `useMediaQuery`.'}
              </div>
            </Surface>
          </div>
        </div>
      </section>

      <section
        className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2"
        id="deep-dive"
      >
        {features.map((feature, idx) => (
          <Surface
            key={feature.title}
            className={twMerge(cardsAnimation, 'bg-card/70')}
            style={{ animationDelay: `${idx * 80}ms` }}
          >
            <div className="mb-4 inline-flex rounded-2xl bg-primary/10 p-3 text-primary">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </Surface>
        ))}
      </section>

      <section className="mx-auto mt-12 max-w-5xl">
        <Surface className="flex flex-col gap-4 bg-card/70 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-primary">
              {'Why Slot + tailwind-merge?'}
            </p>
            <p className="text-muted-foreground">
              {
                'Slot powers the `asChild` prop so buttons can render semantic anchors while preserving'
              }
              {
                'styling. tailwind-merge ensures variant overrides stay predictable.'
              }
            </p>
          </div>
          <Button asChild variant="outline">
            <a href="https://lucide.dev/icons" rel="noreferrer" target="_blank">
              <Waves className="size-4" />
              {'Browse Lucide icons'}
            </a>
          </Button>
        </Surface>
      </section>
    </main>
  );
}
