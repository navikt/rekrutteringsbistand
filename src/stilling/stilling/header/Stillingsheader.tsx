import css from './Stillingsheader.module.css';

interface IStillingsheader {
    children?: React.ReactNode | undefined;
}

const Stillingsheader: React.FC<IStillingsheader> = ({ children }) => (
    <div className={css.stillingsheader}>
        <div /> <div className={css.knapper}>{children}</div>
    </div>
);

export default Stillingsheader;
