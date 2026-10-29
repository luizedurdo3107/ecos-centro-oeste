import React from 'react';
import './ecos-qr-share.css';

/**
 * ECOS_QR_COMPARTILHE_V1
 * Convite para continuar a visita em outro dispositivo.
 * Usa o QR code que a equipe forneceu e oferece um link direto como alternativa.
 */
export default function EcosQrShare() {
  const siteUrl = 'https://open.spotify.com/playlist/0gAzKV2VoFec1Rlp25dTEm';
  const qrSrc = `${import.meta.env.BASE_URL}images/ecos-qr-site.png`;

  return (
    <section className="ecos-qr-section" aria-labelledby="ecos-qr-title">
      <div className="ecos-qr-container">
        <div className="ecos-qr-copy">
          <span className="ecos-qr-kicker">O SOM CONTINUA COM VOCÊ</span>
          <h2 id="ecos-qr-title">Leve esses sons <em>com você.</em></h2>
          <p>
            Gostou dos sons da nossa viagem? Escaneie o QR e ouça a playlist
            do Centro-Oeste no Spotify, no seu próprio celular.
          </p>
          <p className="ecos-qr-hint">Aponte a câmera do celular e abra nossa playlist no Spotify.</p>
          <a
            className="ecos-qr-link"
            href={siteUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            OUVIR PLAYLIST NO SPOTIFY <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="ecos-qr-side">
          <a
            className="ecos-qr-image-link"
            href={siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ouvir a playlist do Centro-Oeste no Spotify em outra aba"
          >
            <img
              src={qrSrc}
              width="548"
              height="553"
              loading="lazy"
              alt="QR code para ouvir a playlist do Centro-Oeste no Spotify"
            />
          </a>
          <span className="ecos-qr-under">ESCANEIE PARA OUVIR A PLAYLIST</span>
        </div>
      </div>
    </section>
  );
}
