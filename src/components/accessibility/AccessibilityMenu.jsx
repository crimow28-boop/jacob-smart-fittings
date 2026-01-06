import React from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Accessibility } from 'lucide-react';

export default function AccessibilityMenu() {
  const [fontSize, setFontSize] = React.useState(100);
  const [contrast, setContrast] = React.useState(false);

  const toggleContrast = () => {
    setContrast(!contrast);
    document.documentElement.classList.toggle('high-contrast');
  };

  const changeFontSize = (delta) => {
    const newSize = Math.max(80, Math.min(150, fontSize + delta));
    setFontSize(newSize);
    document.documentElement.style.fontSize = `${newSize}%`;
  };

  return (
    <div className="fixed top-24 left-0 z-40 hidden md:block">
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-l-none rounded-r-lg shadow-md bg-white border border-l-0 border-slate-200">
            <Accessibility className="w-5 h-5 text-primary" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56 ml-2">
            <DropdownMenuItem onClick={toggleContrast}>
            {contrast ? 'ביטול ניגודיות' : 'ניגודיות גבוהה'}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => changeFontSize(10)}>
            הגדל טקסט (+)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => changeFontSize(-10)}>
            הקטן טקסט (-)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {
                setFontSize(100);
                setContrast(false);
                document.documentElement.style.fontSize = '100%';
                document.documentElement.classList.remove('high-contrast');
            }}>
            איפוס הגדרות
            </DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>
    </div>
  );
}