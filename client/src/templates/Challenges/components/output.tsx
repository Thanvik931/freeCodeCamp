import { isEmpty } from 'lodash-es';
import React from 'react';
import sanitizeHtml from 'sanitize-html';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Button } from '@freecodecamp/ui';

import { initConsole, initLogs } from '../redux/actions';
import './output.css';

export interface OutputProps {
  defaultOutput: string;
  output: string;
  clearConsole?: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      clearConsole: () => {
        dispatch(initConsole(''));
        dispatch(initLogs());
      }
    },
    dispatch
  );

export function Output({
  defaultOutput,
  output,
  clearConsole
}: OutputProps): JSX.Element {
  const { t } = useTranslation();
  const hasOutput = !isEmpty(output);
  const message = sanitizeHtml(hasOutput ? output : defaultOutput, {
    allowedTags: ['b', 'i', 'em', 'strong', 'code', 'wbr']
  });

  return (
    <div className='output-container'>
      {hasOutput && (
        <Button
          className='output-clear-btn'
          size='small'
          variant='primary'
          onClick={clearConsole}
          aria-label={t('buttons.clear-console')}
        >
          {t('buttons.clear-console')}
        </Button>
      )}
      <pre
        className='output-text'
        data-playwright-test-label='output-text'
        dangerouslySetInnerHTML={{ __html: message }}
        role='region'
        aria-label={t('learn.editor-tabs.console')}
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
      />
    </div>
  );
}

Output.displayName = 'Output';

export default connect(null, mapDispatchToProps)(Output);

