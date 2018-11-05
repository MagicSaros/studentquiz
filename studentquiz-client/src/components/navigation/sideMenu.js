import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AssignmentTurnedIn from '@material-ui/icons/AssignmentTurnedIn';

export const SideMenu = ({ handler }) => (
	<div>
		<ListItem button>
			<ListItemIcon>
				<AccountCircle />
			</ListItemIcon>
			<ListItemText primary="Profile" onClick={() => handler('/')} />
		</ListItem>
		<ListItem button>
			<ListItemIcon>
				<AssignmentTurnedIn />
			</ListItemIcon>
			<ListItemText primary="Quizzes" onClick={() => handler('/quizzes')} />
		</ListItem>
	</div>
);