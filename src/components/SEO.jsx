import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

const SEO = ({ 
  title = "Qstom - Personalización de Accesorios Gamer en Bogotá",
  description = "Personalización profesional de accesorios gamer en Bogotá, Colombia. Controles PS5, Xbox, periféricos gaming con tecnología 3D, serigrafía y aerografía.",
  keywords = "personalización gamer Bogotá, controles personalizados Colombia, serigrafía Bogotá, aerografía gaming, accesorios gamer personalizados",
  image = "https://qstom.co/og-image.jpg",
  url = "https://qstom.co/",
  type = "website"
}) => {
  const fullTitle = title.includes('Qstom') ? title : `${title} | Qstom Colombia`;
  
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Canonical */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
  type: PropTypes.string,
};

export default SEO;
