"use client";
import { Button } from "@/components/ui/button";


export default function Home() {
  function handleclick() {
    alert("clicked");
  }
  
  return (

      <div>
        HDkjahd
        <Button onClick={handleclick} 
        >Loop</Button>
      </div>
  );
}
