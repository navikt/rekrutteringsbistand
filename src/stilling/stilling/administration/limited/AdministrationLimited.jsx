import AdStatus from '../adStatus/AdStatus';
import AdStatusEdit from '../adStatus/AdStatusEdit';
import RegistrerInkluderingsmuligheter from '../../edit/registrer-inkluderingsmuligheter/EksternStilling';
import Notat from '../notat/Notat';
import css from '../Administration.module.css';

const AdministrationLimited = ({ kandidatlisteId }) => {
    function editFields() {
        return (
            <div className={css.elements}>
                <RegistrerInkluderingsmuligheter />
                <Notat placeholder="Legg inn notat" />
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
