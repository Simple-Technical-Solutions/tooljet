import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';
import Layout from '@/_ui/Layout';
import { ManageOrgUsers } from '@/ManageOrgUsers';
import { ManageGroupPermissions } from '@/ManageGroupPermissions';
import { ManageSSO } from '@/ManageSSO';
import { ManageOrgVars } from '@/ManageOrgVars';
import { authenticationService } from '@/_services';

export function OrganizationSettings(props) {
  const [admin, setAdmin] = useState(authenticationService.currentOrgValue?.admin);
  const [selectedTab, setSelectedTab] = useState(admin ? 'users' : 'manageEnvVars');
  const { t } = useTranslation();

  useEffect(() => {
    authenticationService.currentOrganization.subscribe((newOrd) => {
      setAdmin(newOrd?.admin);
      admin ? setSelectedTab('users') : setSelectedTab('manageEnvVars');
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticationService.currentOrgValue?.admin]);

  const selectedClassName = props.darkMode ? 'bg-dark-indigo' : 'bg-light-indigo';
  return (
    <Layout switchDarkMode={props.switchDarkMode} darkMode={props.darkMode}>
      <div className="wrapper organization-settings-page">
        <div className="row gx-0">
          <div className="organization-page-sidebar col border-end p-3">
            <div className="list-group">
              {admin && (
                <>
                  <div
                    className={cx(
                      'list-group-item h-4 cursor-pointer list-group-item-action d-flex align-items-center mb-1 border-0 ',
                      {
                        [selectedClassName]: selectedTab === 'users',
                        'text-white': props.darkMode,
                      }
                    )}
                    onClick={() => setSelectedTab('users')}
                    data-cy="manage-users-option"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.99967 2.66659C6.8951 2.66659 5.99967 3.56202 5.99967 4.66659C5.99967 5.77115 6.8951 6.66659 7.99967 6.66659C9.10424 6.66659 9.99967 5.77115 9.99967 4.66659C9.99967 3.56202 9.10424 2.66659 7.99967 2.66659ZM4.66634 4.66659C4.66634 2.82564 6.15873 1.33325 7.99967 1.33325C9.84062 1.33325 11.333 2.82564 11.333 4.66659C11.333 6.50753 9.84062 7.99992 7.99967 7.99992C6.15873 7.99992 4.66634 6.50753 4.66634 4.66659Z"
                        fill="#C1C8CD"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6.66634 10.6666C6.13591 10.6666 5.6272 10.8773 5.25213 11.2524C4.87705 11.6274 4.66634 12.1362 4.66634 12.6666V13.9999C4.66634 14.3681 4.36786 14.6666 3.99967 14.6666C3.63148 14.6666 3.33301 14.3681 3.33301 13.9999V12.6666C3.33301 11.7825 3.6842 10.9347 4.30932 10.3096C4.93444 9.68444 5.78229 9.33325 6.66634 9.33325H9.33301C10.2171 9.33325 11.0649 9.68444 11.69 10.3096C12.3152 10.9347 12.6663 11.7825 12.6663 12.6666V13.9999C12.6663 14.3681 12.3679 14.6666 11.9997 14.6666C11.6315 14.6666 11.333 14.3681 11.333 13.9999V12.6666C11.333 12.1362 11.1223 11.6274 10.7472 11.2524C10.3721 10.8773 9.86344 10.6666 9.33301 10.6666H6.66634Z"
                        fill="#C1C8CD"
                      />
                    </svg>
                    &nbsp;{t('header.organization.menus.menusList.manageUsers', 'Users')}
                  </div>
                  <div
                    className={cx(
                      'list-group-item h-4 cursor-pointer list-group-item-action d-flex align-items-center mb-1 border-0',
                      {
                        [selectedClassName]: selectedTab === 'manageGroups',
                        'text-white': props.darkMode,
                      }
                    )}
                    onClick={() => setSelectedTab('manageGroups')}
                    data-cy="manage-groups-option"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.99967 2.66659C4.89511 2.66659 3.99967 3.56202 3.99967 4.66659C3.99967 5.77115 4.89511 6.66659 5.99967 6.66659C7.10424 6.66659 7.99967 5.77115 7.99967 4.66659C7.99967 3.56202 7.10424 2.66659 5.99967 2.66659ZM2.66634 4.66659C2.66634 2.82564 4.15873 1.33325 5.99967 1.33325C7.84062 1.33325 9.33301 2.82564 9.33301 4.66659C9.33301 6.50753 7.84062 7.99992 5.99967 7.99992C4.15873 7.99992 2.66634 6.50753 2.66634 4.66659ZM10.0205 1.92123C10.1118 1.56454 10.475 1.34943 10.8317 1.44075C11.5487 1.62434 12.1842 2.04134 12.6381 2.62601C13.0919 3.21068 13.3382 3.92978 13.3382 4.66992C13.3382 5.41006 13.0919 6.12915 12.6381 6.71383C12.1842 7.2985 11.5487 7.7155 10.8317 7.89909C10.475 7.99041 10.1118 7.7753 10.0205 7.41861C9.92918 7.06193 10.1443 6.69874 10.501 6.60742C10.9312 6.49727 11.3125 6.24707 11.5848 5.89626C11.8571 5.54546 12.0049 5.114 12.0049 4.66992C12.0049 4.22583 11.8571 3.79438 11.5848 3.44357C11.3125 3.09277 10.9312 2.84257 10.501 2.73242C10.1443 2.64109 9.92918 2.27791 10.0205 1.92123ZM4.66634 10.6666C4.13591 10.6666 3.6272 10.8773 3.25213 11.2524C2.87705 11.6274 2.66634 12.1362 2.66634 12.6666V13.9999C2.66634 14.3681 2.36786 14.6666 1.99967 14.6666C1.63148 14.6666 1.33301 14.3681 1.33301 13.9999V12.6666C1.33301 11.7825 1.6842 10.9347 2.30932 10.3096C2.93444 9.68444 3.78229 9.33325 4.66634 9.33325H7.33301C8.21706 9.33325 9.06491 9.68444 9.69003 10.3096C10.3152 10.9347 10.6663 11.7825 10.6663 12.6666V13.9999C10.6663 14.3681 10.3679 14.6666 9.99967 14.6666C9.63148 14.6666 9.33301 14.3681 9.33301 13.9999V12.6666C9.33301 12.1362 9.12229 11.6274 8.74722 11.2524C8.37215 10.8773 7.86344 10.6666 7.33301 10.6666H4.66634ZM11.3542 9.93326C11.4462 9.57676 11.8098 9.36238 12.1663 9.45442C12.8787 9.63833 13.5102 10.0528 13.9624 10.6331C14.4146 11.2134 14.6621 11.9271 14.6663 12.6628L14.6664 12.6666L14.6663 13.9999C14.6663 14.3681 14.3679 14.6666 13.9997 14.6666C13.6315 14.6666 13.333 14.3681 13.333 13.9999V12.6686C13.3301 12.2278 13.1816 11.8003 12.9107 11.4526C12.6393 11.1044 12.2604 10.8558 11.833 10.7454C11.4765 10.6534 11.2621 10.2898 11.3542 9.93326Z"
                        fill="#C1C8CD"
                      />
                    </svg>
                    &nbsp;{t('header.organization.menus.menusList.manageGroups', 'Manage Groups')}
                  </div>
                  <div
                    className={cx(
                      'list-group-item h-4 cursor-pointer list-group-item-action d-flex align-items-center mb-1 border-0',
                      {
                        [selectedClassName]: selectedTab === 'manageSSO',
                        'text-white': props.darkMode,
                      }
                    )}
                    onClick={() => setSelectedTab('manageSSO')}
                    data-cy="manage-sso-option"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.55814 1.50062C7.81037 1.27746 8.18941 1.27746 8.44164 1.50062C9.86909 2.76352 11.7321 3.42107 13.6361 3.33395C13.9429 3.31991 14.2195 3.51726 14.3062 3.8119C14.6338 4.9263 14.734 6.09518 14.6009 7.24908C14.4678 8.40299 14.1042 9.51837 13.5315 10.5289C12.9588 11.5395 12.1889 12.4247 11.2674 13.1318C10.3459 13.8389 9.29162 14.3536 8.16727 14.6452C8.0575 14.6737 7.94228 14.6737 7.83251 14.6452C6.70816 14.3536 5.65391 13.8389 4.7324 13.1318C3.81089 12.4247 3.04093 11.5395 2.46827 10.5289C1.89561 9.51837 1.53194 8.40299 1.39886 7.24908C1.26579 6.09518 1.36602 4.9263 1.69362 3.8119C1.78023 3.51726 2.05691 3.31991 2.3637 3.33395C4.26763 3.42107 6.13069 2.76352 7.55814 1.50062ZM2.84791 4.67368C2.67246 5.46758 2.63 6.28632 2.72342 7.09633C2.83602 8.07271 3.14374 9.01649 3.6283 9.8716C4.11286 10.7267 4.76437 11.4757 5.5441 12.074C6.27794 12.6371 7.11127 13.056 7.99989 13.3091C8.88851 13.056 9.72184 12.6371 10.4557 12.074C11.2354 11.4757 11.8869 10.7267 12.3715 9.8716C12.856 9.01649 13.1638 8.07271 13.2764 7.09633C13.3698 6.28631 13.3273 5.46758 13.1519 4.67368C11.2845 4.64164 9.477 4.00683 7.99989 2.86474C6.52278 4.00683 4.71527 4.64164 2.84791 4.67368ZM6.66656 7.33325C6.66656 6.59687 7.26351 5.99992 7.99989 5.99992C8.73627 5.99992 9.33322 6.59687 9.33322 7.33325C9.33322 7.82677 9.06509 8.25767 8.66656 8.48821V9.66659C8.66656 10.0348 8.36808 10.3333 7.99989 10.3333C7.6317 10.3333 7.33322 10.0348 7.33322 9.66659V8.48821C6.93469 8.25767 6.66656 7.82677 6.66656 7.33325Z"
                        fill="#C1C8CD"
                      />
                    </svg>
                    &nbsp;{t('header.organization.menus.menusList.manageSso', 'SSO')}
                  </div>
                </>
              )}
              <div
                className={cx(
                  'list-group-item h-4 cursor-pointer list-group-item-action d-flex align-items-center mb-1 border-0 ',
                  {
                    [selectedClassName]: selectedTab === 'manageEnvVars',
                    'text-white': props.darkMode,
                  }
                )}
                onClick={() => setSelectedTab('manageEnvVars')}
                data-cy="workspace-variable-option"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.3333 2.33325C11.7015 2.33325 12 2.63173 12 2.99992V4.11019L13.0066 3.54416C13.3275 3.36369 13.734 3.47756 13.9144 3.79848C14.0949 4.11941 13.981 4.52588 13.6601 4.70634L12.6932 5.25009L13.6602 5.79424C13.9811 5.97479 14.0949 6.38128 13.9143 6.70217C13.7338 7.02305 13.3273 7.13681 13.0064 6.95626L12 6.38998V7.49992C12 7.86811 11.7015 8.16659 11.3333 8.16659C10.9651 8.16659 10.6667 7.86811 10.6667 7.49992V6.38998L9.66025 6.95626C9.33937 7.13681 8.93287 7.02305 8.75232 6.70217C8.57177 6.38128 8.68554 5.97479 9.00642 5.79424L9.97351 5.25009L9.00657 4.70634C8.68564 4.52588 8.57177 4.11941 8.75224 3.79848C8.93271 3.47756 9.33917 3.36369 9.6601 3.54416L10.6667 4.11019V2.99992C10.6667 2.63173 10.9651 2.33325 11.3333 2.33325ZM4.33333 10.6666C4.06812 10.6666 3.81376 10.7719 3.62623 10.9595C3.43869 11.147 3.33333 11.4014 3.33333 11.6666C3.33333 11.9318 3.43869 12.1862 3.62623 12.3737C3.81376 12.5612 4.06812 12.6666 4.33333 12.6666C4.59855 12.6666 4.8529 12.5612 5.04044 12.3737C5.22798 12.1862 5.33333 11.9318 5.33333 11.6666C5.33333 11.4014 5.22798 11.147 5.04044 10.9595C4.8529 10.7719 4.59855 10.6666 4.33333 10.6666ZM2.68342 10.0167C3.121 9.57908 3.71449 9.33325 4.33333 9.33325C4.95217 9.33325 5.54566 9.57908 5.98325 10.0167C6.42083 10.4543 6.66667 11.0477 6.66667 11.6666C6.66667 12.2854 6.42083 12.8789 5.98325 13.3165C5.54566 13.7541 4.95217 13.9999 4.33333 13.9999C3.71449 13.9999 3.121 13.7541 2.68342 13.3165C2.24583 12.8789 2 12.2854 2 11.6666C2 11.0477 2.24583 10.4543 2.68342 10.0167Z"
                    fill="#C1C8CD"
                  />
                </svg>
                &nbsp;{t('header.organization.menus.menusList.manageEnv', 'Manage Environment Variables')}
              </div>
            </div>
          </div>
          <div
            className={cx('col p-3', {
              'bg-light-gray': !props.darkMode,
            })}
          >
            <div className="w-100 mb-5">
              {selectedTab === 'users' && <ManageOrgUsers darkMode={props.darkMode} />}
              {selectedTab === 'manageGroups' && <ManageGroupPermissions darkMode={props.darkMode} />}
              {selectedTab === 'manageSSO' && <ManageSSO />}
              {selectedTab === 'manageEnvVars' && <ManageOrgVars darkMode={props.darkMode} />}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
