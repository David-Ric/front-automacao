import "./paginacao.scss";
let MAX_ITEMS = 9;
const MAX_LEFT = (MAX_ITEMS - 1) / 2;

if (window.screen.width <= 768) {
  MAX_ITEMS = 5;
}

export default function Paginacao({
  limit,
  total,
  paginaAtual,
  setPagina,
  exibirTotal,
  maxPaginas  
}: any) {
  const current = paginaAtual;
  const pages = maxPaginas? Number(maxPaginas): Math.ceil(total / limit);
  const maxFirst = Math.max(pages - (MAX_ITEMS - 1), 1);
  const first = Math.min(Math.max(current - MAX_LEFT, 1), maxFirst);
  const exibirTotalRegistros: boolean = exibirTotal ? Boolean(exibirTotal) : false;
  const totalRegistros = Number(total);

  function onPageChange(page: any) {
    setPagina(page);
  }

  return (
    <>
      {total > limit ? (
        <nav aria-label="Page navigation" id="page-navegation">
          <ul className= {`pagination justify-content-center mt-4 ${(!exibirTotalRegistros ? "mb-4" : "mb-2")}`}>
            {current !== 1 && (
              <li className="page-item">
                <button
                  className="page-link"
                  aria-label="Previous"
                  onClick={() => onPageChange(current - 1)}
                >
                  <span aria-hidden="true">&laquo;</span>
                </button>
              </li>
            )}

            {Array.from({ length: Math.min(MAX_ITEMS, pages) })
              .map((_, index) => index + first)
              .map((page) => (
                <li key={page} className="page-item">
                  <button
                    className={
                      page === current ? "page-link active" : "page-link"
                    }
                    onClick={() => onPageChange(page)}
                  >
                    {page}
                  </button>
                </li>
              ))}

            {current !== pages && (
              <li className="page-item">
                <button
                  className="page-link"
                  aria-label="Next"
                  onClick={() => onPageChange(current + 1)}
                >
                  <span aria-hidden="true">&raquo;</span>
                </button>
              </li>
            )}
          </ul>
          {exibirTotalRegistros ? (
              <p className="text-center total-registros">{(current - 1) * limit + 1} - {(current * limit) < totalRegistros ? (current * limit) : totalRegistros} de {totalRegistros}</p>
          ): (<></>) }
        </nav>
      ) : (
        <></>
      )}
    </>
  );
}
