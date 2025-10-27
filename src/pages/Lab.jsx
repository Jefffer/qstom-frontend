import { useEffect } from 'react';
import { ControllerConfigurator } from '../features/controller-configurator';

const Lab = () => {
  useEffect(() => {
    // Evitar scroll en la página Lab
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="w-full h-screen relative">
      <ControllerConfigurator />
    </div>
  );
};

export default Lab;
