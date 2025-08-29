// Update this page (the content is just a fallback if you fail to update the page)

import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold mb-4">Patient Healthcare Portal</h1>
        <p className="text-xl text-muted-foreground">Comprehensive therapy management and progress tracking</p>
        <Button onClick={() => navigate('/dashboard')} size="lg">
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default Index;
