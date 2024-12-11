import PropTypes from 'prop-types'
export default function Pagination(props) {
  return (
    <div className="join">
      <button
        disabled={props.isPreviousDisabled}
        onClick={props.onClickPrevious}
        className="join-item btn"
      >
        «
      </button>
      <button className="join-item btn">Página {props.page}</button>
      <button
        disabled={props.isNextDisabled}
        onClick={props.onClickNext}
        className="join-item btn"
      >
        »
      </button>
    </div>
  );
}

Pagination.propTypes = {
    isPreviousDisabled: PropTypes.bool,
    isNextDisabled: PropTypes.bool,
    onClickPrevious: PropTypes.func,
    onClickNext: PropTypes.func,
    page: PropTypes.number
}
