// import * as React from "react";
// import * as ProgressPrimitive from "@radix-ui/react-progress";

// import { cn } from "@/lib/utils";

// function Progress({ className, value, ...props }) {
//   return (
//     <ProgressPrimitive.Root
//       data-slot="progress"
//       className={cn(
//         "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
//         className
//       )}
//       {...props}
//     >
//       <ProgressPrimitive.Indicator
//         data-slot="progress-indicator"
//         className="bg-primary h-full w-full flex-1 transition-all"
//         style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
//       />
//     </ProgressPrimitive.Root>
//   );
// }

// export { Progress };

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

function Progress({ className, value, ...props }) {
  const getColor = () => {
    switch (props.status) {
      case "In Progress":
        return "text-cyan-500 bg-cyan-500 border border-cyan-500/10";
      case "Completed":
        return "text-indigo-500 bg-indigo-500 border border-indigo-500/10";
      default:
        return "text-violet-500 bg-violet-500 border border-violet-500/10";
    }
  };

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-gray-200 relative h-2 w-full overflow-hidden rounded-full",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={`${getColor()} h-full w-full flex-1`}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
