import './Footer.scss';
import '../../styles/global.scss';
import { BsFacebook } from 'react-icons/bs';
import { BsInstagram } from 'react-icons/bs';
import { BsLinkedin } from 'react-icons/bs';
import { BsYoutube } from 'react-icons/bs';
import api from '../../services/api';
import { useEffect, useState } from 'react';
import { versaoFront as versaoFrontConst } from '../../data/indexedDB';

export default function Footer() {
  let [versaoAPI, setversaoAPI] = useState('');
  let [versaoFront, setversaoFront] = useState('');
  let [dataFront, setdataFront] = useState('');
  let [dataAPI, setdataAPI] = useState('');

  useEffect(() => {}, []);

  async function GetApiVersao() {
    await api

      .get(`/api/Log`)
      .then((response) => {
        setversaoAPI(response.data[0].versaoApi);
        versaoAPI = response.data[0].versaoApi;
        setdataAPI(response.data[0].atualizadoEm);
        dataAPI = response.data[0].atualizadoEm;
      })
      .catch((error) => {});
  }

  function formatDate(dateTimeString: string): string {
    const dataAtual = new Date(dateTimeString);
    const dia = dataAtual.getDate().toString().padStart(2, '0');
    const mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0');
    const ano = dataAtual.getFullYear().toString();
    return `${dia}/${mes}/${ano}`;
  }

  return (
    <>
      <div className="content-footer">
        <div className="social">
          <a
            className="redes"
            target="_blank"
            href="https://pt-br.facebook.com/grupoalynecosmeticos/"
          >
            <BsFacebook fontSize={25} />{' '}
          </a>
          <a
            className="redes"
            target="_blank"
            href="https://www.instagram.com/grupoalynecosmeticos/"
          >
            <BsInstagram fontSize={25} />{' '}
          </a>
          <a
            className="redes"
            target="_blank"
            href="https://www.linkedin.com/company/grupoalynecosmeticos/"
          >
            <BsLinkedin fontSize={25} />{' '}
          </a>
          <a
            className="redes"
            target="_blank"
            href="https://www.youtube.com/channel/UCX4t2MySUE_-dIM5OV5gmYA"
          >
            <BsYoutube fontSize={25} />{' '}
          </a>
        </div>
        <div className="Informacoes">
          <h1 className="portal-footer">Versão Front: {versaoFrontConst} - Data: 09/04/2026</h1>
          <h1 className="portal-footer">
            Versão API: 1.1.023 - Data: 09/04/2026
          </h1>
        </div>
      </div>
    </>
  );
}
