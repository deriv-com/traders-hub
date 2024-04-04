import { useGetAccountStatus } from '@deriv-com/api-hooks';
import { renderHook } from '@testing-library/react';

import { useAccountStatus } from '../useAccountStatus';

jest.mock('@deriv-com/api-hooks', () => ({
  useGetAccountStatus: jest.fn(),
}));

describe('useAccountStatus', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useGetAccountStatus as jest.Mock).mockReturnValue({
      data: {},
      rest: {},
    });
  });

  it('should correctly modify account status data', () => {
    const mockData = {
      status: ['address_verified', 'allow_document_upload', 'age_verification'],
    };

    (useGetAccountStatus as jest.Mock).mockReturnValue({
      data: mockData,
      rest: {},
    });

    const { result } = renderHook(() => useAccountStatus());

    expect(result.current.data).toEqual({
      status: ['address_verified', 'allow_document_upload', 'age_verification'],
      is_address_verified: true,
      is_allow_document_upload: true,
      is_age_verification: true,
      is_authenticated: false,
      is_cashier_locked: false,
      is_crs_tin_information: false,
      is_deposit_locked: false,
      is_disabled: false,
      is_document_expired: false,
      is_document_expiring_soon: false,
      is_dxtrade_password_not_set: false,
      is_financial_assessment_not_complete: false,
      is_financial_information_not_complete: false,
      is_financial_risk_approval: false,
      is_max_turnover_limit_not_set: false,
      is_mt5_password_not_set: false,
      is_mt5_withdrawal_locked: false,
      is_needs_affiliate_coc_approval: false,
      is_no_trading: false,
      is_no_withdrawal_or_trading: false,
      is_p2p_blocked_for_pa: false,
      is_pa_withdrawal_explicitly_allowed: false,
      is_password_reset_required: false,
      is_professional: false,
      is_professional_requested: false,
      is_professional_rejected: false,
      is_social_signup: false,
      is_trading_experience_not_complete: false,
      is_ukgc_funds_protection: false,
      is_unwelcome: false,
      is_withdrawal_locked: false,
      is_deposit_attempt: false,
      is_poi_name_mismatch: false,
      is_allow_poa_resubmission: false,
      is_allow_poi_resubmission: false,
      is_shared_payment_method: false,
      is_personal_details_locked: false,
      is_transfers_blocked: false,
      is_df_deposit_requires_poi: false,
      is_authenticated_with_idv_photoid: false,
      is_idv_revoked: false,
      is_mt5_additional_kyc_required: false,
      is_poi_expiring_soon: false,
      is_poa_expiring_soon: false,
      is_tin_manually_approved: false,
    });
  });

  it('should return null if data is empty', () => {
    (useGetAccountStatus as jest.Mock).mockReturnValue({
      data: {},
      rest: {},
    });

    const { result } = renderHook(() => useAccountStatus());

    expect(result.current.data).toEqual(null);
  });

  it('should handle error', () => {
    (useGetAccountStatus as jest.Mock).mockReturnValue({
      data: null,
      error: 'error',
    });

    const { result } = renderHook(() => useAccountStatus());

    expect(result.current.error).toEqual('error');
  });
});
