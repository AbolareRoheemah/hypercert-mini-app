"use client";

import {
  useMiniKit,
} from "@coinbase/onchainkit/minikit";
// import { useEffect, useMemo, useState, useCallback } from "react";
// import { Button } from "./components/DemoComponents";
// import { Icon } from "./components/DemoComponents";
import Hypercerts from "./components/Hypercerts";
import { useEffect } from "react";

export default function App() {
  const { setFrameReady, isFrameReady } = useMiniKit();
  // const [frameAdded, setFrameAdded] = useState(false);

  // const addFrame = useAddFrame();
  // const openUrl = useOpenUrl();

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  // const handleAddFrame = useCallback(async () => {
  //   const frameAdded = await addFrame();
  //   setFrameAdded(Boolean(frameAdded));
  // }, [addFrame]);

  // const saveFrameButton = useMemo(() => {
  //   if (context && !context.client.added) {
  //     return (
  //       <Button
  //         variant="ghost"
  //         size="sm"
  //         onClick={handleAddFrame}
  //         className="text-[var(--app-accent)] p-4"
  //         icon={<Icon name="plus" size="sm" />}
  //       >
  //         Save Frame
  //       </Button>
  //     );
  //   }

  //   if (frameAdded) {
  //     return (
  //       <div className="flex items-center space-x-1 text-sm font-medium text-[#0052FF] animate-fade-out">
  //         <Icon name="check" size="sm" className="text-[#0052FF]" />
  //         <span>Saved</span>
  //       </div>
  //     );
  //   }

  //   return null;
  // }, [context, frameAdded, handleAddFrame]);

  return (
    <div className="flex flex-col min-h-screen font-sans text-[var(--app-foreground)] mini-app-theme from-[var(--app-background)] to-[var(--app-gray)]">
      <Hypercerts />
    </div>
  );
}
