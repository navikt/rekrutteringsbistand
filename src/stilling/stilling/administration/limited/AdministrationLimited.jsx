import RegistrerInkluderingsmuligheter from '../../edit/registrer-inkluderingsmuligheter/EksternStilling';
import css from '../Administration.module.css';
import AdStatus from '../adStatus/AdStatus';
import AdStatusEdit from '../adStatus/AdStatusEdit';

const AdministrationLimited = ({ kandidatlisteId }) => {
    function editFields() {
        return (
            <div className={css.elements}>
                <RegistrerInkluderingsmuligheter />
            </div>
        );
    }

    return (
        <div>
            <AdStatus />
            <div>{editFields()}</div>
            <div className={css.bottom}>
                <AdStatusEdit stillingId={kandidatlisteId} />
            </div>
        </div>
    );
};

export default AdministrationLimited;
