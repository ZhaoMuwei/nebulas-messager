import React from 'react';

import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';

import Controls from '../src/components/controls';
import List from '../src/components/list';

import '../src/App.css';


storiesOf('Controls', module)
    .add('basic', () => (
        <Controls
            onCreateButtonClick={action('create')}
            onReloadButtonClick={action('reload')}
        />
    ))

storiesOf('List', module)
    .add('basic', () => (
        <List
            loading={false}
            data={Array(10)}
        />
    ))
