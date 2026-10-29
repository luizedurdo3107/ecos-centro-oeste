import React from 'react';
import './ecos-qr-share.css';

/**
 * ECOS_QR_COMPARTILHE_V1
 * Convite para continuar a visita em outro dispositivo.
 * Usa o QR code que a equipe forneceu e oferece um link direto como alternativa.
 */
export default function EcosQrShare() {
  const siteUrl = 'https://ecos-centro-oeste-psi.vercel.app/';
  const qrSrc = `${import.meta.env.BASE_URL}images/ecos-qr-site.png`;

  return (
    <section className="ecos-qr-section" aria-labelledby="ecos-qr-title">
      <div className="ecos-qr-container">
        <div className="ecos-qr-copy">
          <span className="ecos-qr-kicker">O SOM CONTINUA COM VOCÊ</span>
          <h2 id="ecos-qr-title">Leve essa viagem <em>com você.</em></h2>
          <p>
            Descobriu um novo som? Continue explorando as histórias e os artistas
            do Centro-Oeste no seu próprio celular.
          </p>
          <p className="ecos-qr-hint">Aponte a câmera do celular para o QR code.</p>
          <a
            className="ecos-qr-link"
            href={siteUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            ACESSAR O MUSEU <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="ecos-qr-side">
          <a
            className="ecos-qr-image-link"
            href={siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abrir Ecos do Centro-Oeste em outra aba"
          >
            <img
              src={qrSrc}
              width="548"
              height="553"
              loading="lazy"
              alt="QR code para acessar o museu ECOS DO CENTRO-OESTE pelo celular"
            />
          </a>
          <span className="ecos-qr-under">ESCANEIE E CONTINUE A EXPLORAÇÃO</span>
        </div>
      </div>
    </section>
  );
}
