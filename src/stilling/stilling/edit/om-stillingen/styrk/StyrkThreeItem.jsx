import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ChevronDownIcon, ChevronRightIcon } from '@navikt/aksel-icons';
import { Button, Detail } from '@navikt/ds-react';
import css from './StyrkThree.module.css';

export default class StyrkThreeItem extends React.Component {
    onClick = (e) => {
        e.stopPropagation();
        this.props.onClick(this.props.item);
    };

    render() {
        const { item } = this.props;

        if (!item.visible) {
            return null;
        }

        return (
            <div className={css.item}>
                {item.children ? (
                    <Button
                        size="small"
                        variant="tertiary"
                        onClick={this.onClick}
                        className={classNames(css.branch)}
                        icon={
                            item.expanded ? (
                                <ChevronDownIcon className={css.branchChevron} />
                            ) : (
                                <ChevronRightIcon className={css.branchChevron} />
                            )
                        }
                    >
                        {item.code}: {item.name}
                    </Button>
                ) : (
                    <Button
                        size="small"
                        variant="tertiary"
                        onClick={this.onClick}
                        className={css.leaf}
                    >
                        {item.code}: {item.name}
                        {item.alternativeNames?.length > 0 && (
                            <Detail>{item.alternativeNames.join(', ')}</Detail>
                        )}
                    </Button>
                )}
                {item.expanded &&
                    item.children &&
                    item.children.map((child) => (
                        <StyrkThreeItem key={child.id} item={child} onClick={this.props.onClick} />
                    ))}
            </div>
        );
    }
}

StyrkThreeItem.propTypes = {
    item: PropTypes.shape({
        name: PropTypes.string,
        code: PropTypes.string,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
};
