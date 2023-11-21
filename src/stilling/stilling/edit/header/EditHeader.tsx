import Stilling from 'felles/domene/stilling/Stilling';
import Styrk from '../om-stillingen/styrk/Styrk';

type Props = {
    stilling: Stilling;
};

const EditHeader = ({ stilling }: Props) => {
    return (
        <>
            <Styrk />
        </>
    );
};

export default EditHeader;
