import React, { Fragment } from 'react';
import whiteLogo from '../../assets/logo-white.png'
import { Link } from 'react-router-dom';
const LandingPage = () => {
  return (
    
    <Fragment>
      <div className='landing-page-container'>
      <div className="landing-page-header-container">
        <img src={whiteLogo} alt="logo"></img>


        <div>
          <Link to="/login"><button className="lp-button">Logg inn</button></Link>
          <button className="lp-button">Registrer</button>

        </div>
        

      </div>
      <div className="landing-page-content">
      <h1>B2b for små og mellomstore bedrifter</h1>
      <p>Handel mellom små bedrifter er tradisjonelt basert på tillit. Dette foregår i lokale økosystemer og håndteres via telefon og e-post. Alternativer for å digitalisere prosessen er rettet mot større selskaper eller isolerte enkeltbedrifter, og er ofte kun tilgjengelige på forespørsel.</p>

      <p><b>Btb</b> er en lavterskels markedsplass som digitaliserer bestillingsprosessen mellom små bedrifter i et lokalt økosystem.</p>

      <p>En åpen plattform med gratis tilgang til å registrere din bedrift med dine produkter. Gjennomfør bestillinger og salg på en enkel og oversiktelig måte. Ved større katalog/omsetning abonnerer du på PRO-planen uten begrensninger, eller ENTERPRISE-planen med integrasjoner. Produkter og firmaer er tilgjengelige for søk uten registrering.</p>
      </div>
      
      </div>
    </Fragment>
    
  )
}

export default LandingPage;
