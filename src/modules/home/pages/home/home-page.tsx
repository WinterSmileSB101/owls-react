import React, { FC } from 'react';

const HomePage: FC = (props) => {
    const test = 1;
    return (
        <>
            {test}
            <button
                type='button'
                onClick={async () => {
                    const a = await import('./test');
                    a.default();
                }}>
                点我加载
            </button>
        </>
    );
};

HomePage.displayName = 'HomePage';

export { HomePage };
