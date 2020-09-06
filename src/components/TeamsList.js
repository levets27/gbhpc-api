import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import StarIcon from '@material-ui/icons/Star';
import EnhancedTable from './EnhancedTable';

const GET_TEAMS = gql`
  query {
    teams {
      id
      champion
      color
      name
      seasonBySeason {
        year
        season
      }
      captainPlayer {
        firstName
        lastName
      }
    }
  }
`;

function createData(id, season, team, captain) {
  return { id, season, team, captain };
}
const headCells = [
  { id: 'season', numeric: false, label: 'Season' },
  { id: 'name', numeric: false, label: 'Team Name' },
  { id: 'captain', numeric: false, label: 'Captain' },
];

const TeamsList = () => {
  const { loading, error, data } = useQuery(GET_TEAMS);

  if (loading) return 'loading...';
  if (error) return `error: ${error.message}`;

  const teamData = data.teams.map(stat => {
    const { id, champion, color, name, seasonBySeason, captainPlayer } = stat;
    return createData(
      id,
      `${seasonBySeason.year} ${seasonBySeason.season}`,
      <>
        {champion && <StarIcon />}
        {name}
        {color ? ` (${color})` : ''}
      </>,
      captainPlayer
        ? `${captainPlayer.firstName} ${captainPlayer.lastName}`
        : ''
    );
  });

  return (
    <EnhancedTable
      defaultOrder="desc"
      defaultOrderBy="ppg"
      enablePagination
      headCells={headCells}
      rows={teamData}
      tableTitle="Player Statistics"
    />
  );
};

export default TeamsList;
export { GET_TEAMS };
