import css from './Banner.module.css';
import { Heading } from '@navikt/ds-react';
import { ReactComponent as FaaJobbPiktogram } from './fåjobb.svg';

type Props = {
    tittel: String;
};

const Banner = ({ tittel }: Props) => {
    return (
        <div className={css.banner}>
            <div className={css.piktogramOgInnhold}>
                <FaaJobbPiktogram></FaaJobbPiktogram>
                <Heading className={css.innhold} level="1" size="xlarge">
                    {tittel}
                </Heading>
            </div>
        </div>
    );
};

export default Banner;
