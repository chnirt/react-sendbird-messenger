import React from 'react'
import { Result, Button } from 'antd'
import { useTranslation } from 'react-i18next'

import { ReactComponent as Logo } from '@assets/images/logo/ic-main-sendbird-logo-white.svg'
import { ScaleIn } from '@animations'

export function EmptyChannel() {
    const { t } = useTranslation()

    return (
        <div
            style={{
                height: 'calc(100vh - 2px)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Result
                icon={<Logo />}
                title={t('src.screens.dashboard.components.YM')}
                subTitle={t('src.screens.dashboard.components.SPPAMTAFOG')}
                extra={[
                    <ScaleIn>
                        <Button type="primary" key="console">
                            {t('src.screens.dashboard.components.SM')}
                        </Button>
                    </ScaleIn>,
                ]}
            />
        </div>
    )
}
