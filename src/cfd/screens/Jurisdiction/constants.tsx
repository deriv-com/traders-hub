import DocumentsIcon from '@/assets/svgs/ic-documents.svg?react';
import IdCardIcon from '@/assets/svgs/ic-id-card.svg?react';
import NotApplicableIcon from '@/assets/svgs/ic-not-applicable.svg?react';
import SelfieIcon from '@/assets/svgs/ic-selfie.svg?react';
import VerificationFailedStatusIcon from '@/assets/svgs/ic-verification-failed-status.svg?react';
import VerificationPendingStatusIcon from '@/assets/svgs/ic-verification-pending-status.svg?react';
import VerificationSuccessStatusIcon from '@/assets/svgs/ic-verification-success-status.svg?react';

export const verificationIconsMapper: Record<string, JSX.Element> = {
    documentNumber: <IdCardIcon />,
    nameAndAddress: <DocumentsIcon />,
    notApplicable: <NotApplicableIcon />,
    selfie: <SelfieIcon />,
};

export const verificationStatusIconsMapper: Record<string, JSX.Element> = {
    verificationFailedStatusIcon: <VerificationFailedStatusIcon />,
    verificationPendingStatusIcon: <VerificationPendingStatusIcon />,
    verificationSuccessStatusIcon: <VerificationSuccessStatusIcon />,
};
