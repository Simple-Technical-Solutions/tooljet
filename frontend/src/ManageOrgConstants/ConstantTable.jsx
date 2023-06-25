import React from 'react';
import { ButtonSolid } from '@/_ui/AppButton/AppButton';

const ConstantTable = ({
  constants = [],
  findValueForEnvironment,
  activeTabEnvironment,
  canUpdateDeleteConstant = true,
  onEditBtnClicked,
  onDeleteBtnClicked,
  isLoading = false,
}) => {
  const tableRef = React.createRef(null);

  const calculateOffset = () => {
    const elementHeight = tableRef.current.getBoundingClientRect().top;
    return window.innerHeight - elementHeight;
  };

  return (
    <div className="container-xl">
      <div className="card" style={{ border: 'none' }}>
        <div
          className="fixedHeader table-responsive px-2"
          ref={tableRef}
          style={{ maxHeight: tableRef.current && calculateOffset() }}
        >
          <table className="table table-vcenter variables-table-wrapper" disabled={true}>
            <thead>
              <tr>
                <th data-cy="workspace-variable-table-name-header">Name</th>
                <th data-cy="workspace-variable-table-value-header">Value</th>
                {canUpdateDeleteConstant && <th className="w-1"></th>}
              </tr>
            </thead>
            {isLoading ? (
              <tbody className="w-100" style={{ minHeight: '300px' }}>
                {Array.from(Array(4)).map((_item, index) => (
                  <tr key={index}>
                    <td className="col-4 p-3">
                      <div className="skeleton-line w-10"></div>
                    </td>
                    <td className="col-2 p-3">
                      <div className="skeleton-line"></div>
                    </td>
                    <td className="col-2 p-3">
                      <div className="skeleton-line"></div>
                    </td>
                    <td className="text-muted col-auto col-1 pt-3">
                      <div className="skeleton-line"></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                {constants.map((constant) => (
                  <tr key={constant.id}>
                    <td>
                      <span data-cy={`${constant.name.toLowerCase().replace(/\s+/g, '-')}-workspace-constant-name`}>
                        {constant.name}
                      </span>
                    </td>
                    <td className="text-muted">
                      <a
                        className="text-reset user-email"
                        data-cy={`${constant.name.toLowerCase().replace(/\s+/g, '-')}-workspace-constant-value`}
                      >
                        {findValueForEnvironment(constant.values, activeTabEnvironment?.name)}
                      </a>
                    </td>

                    {canUpdateDeleteConstant && (
                      <td>
                        <div
                          style={{ display: 'flex', justifyContent: 'space-between', gap: 5 }}
                          data-cy={`${constant.name.toLowerCase().replace(/\s+/g, '-')}-workspace-constant-update`}
                        >
                          <td>
                            <ButtonSolid
                              variant="secondary"
                              style={{ minWidth: '100px' }}
                              className="workspace-user-archive-btn tj-text-xsm"
                              leftIcon="editrectangle"
                              fill="#3b5ccc"
                              iconWidth="12"
                              onClick={() => onEditBtnClicked(constant)}
                              data-cy="button-user-status-change"
                            >
                              Edit
                            </ButtonSolid>
                          </td>
                          <td>
                            <ButtonSolid
                              variant="dangerSecondary"
                              style={{ minWidth: '100px' }}
                              className="workspace-user-archive-btn tj-text-xsm"
                              leftIcon="trash"
                              fill="#E54D2E"
                              iconWidth="12"
                              onClick={() => onDeleteBtnClicked(constant)}
                              data-cy="button-user-status-change"
                            >
                              Delete
                            </ButtonSolid>
                          </td>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default ConstantTable;