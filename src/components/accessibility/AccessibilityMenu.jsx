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
    <div className="fixed top-24 left-0 z-40">
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button 
              variant="secondary" 
              size="icon" 
              className="rounded-l-none rounded-r-lg shadow-md bg-white border border-l-0 border-slate-200 h-10 w-10 md:h-12 md:w-12"
              aria-label="תפריט נגישות"
            >
            <Accessibility className="w-6 h-6 text-primary" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56 ml-2">
            <DropdownMenuItem onClick={toggleContrast} className="cursor-pointer">
            {contrast ? 'ביטול ניגודיות' : 'ניגודיות גבוהה'}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => changeFontSize(10)} className="cursor-pointer">
            הגדל טקסט (+)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => changeFontSize(-10)} className="cursor-pointer">
            הקטן טקסט (-)
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={() => {
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