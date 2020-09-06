import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import EnhancedTable from './EnhancedTable';

const GET_STATS = gql`
  query {
    stats {
      id
      gamesPlayed
      goals
      assists
      pim
      playerByPlayer {
        firstName
        lastName
      }
      seasonBySeason {
        year
        season
      }
      teamByTeam {
        name
      }
    }
  }
`;

function createData(
  id,
  lastName,
  firstName,
  season,
  team,
  gamesPlayed,
  goals,
  assists,
  points,
  pim,
  gpg,
  apg,
  ppg,
  pimpg
) {
  return {
    id,
    lastName,
    firstName,
    season,
    team,
    gamesPlayed: Number(gamesPlayed),
    goals: Number(goals),
    assists: Number(assists),
    points: Number(points),
    pim: Number(pim),
    gpg: Number(gpg),
    apg: Number(apg),
    ppg: Number(ppg),
    pimpg: Number(pimpg),
  };
}

const headCells = [
  { id: 'lastName', numeric: false, label: 'Last Name' },
  { id: 'firstName', numeric: false, label: 'First Name' },
  { id: 'season', numeric: false, label: 'Season' },
  { id: 'team', numeric: false, label: 'Team' },
  { id: 'gamesPlayed', numeric: true, label: 'GP' },
  { id: 'goals', numeric: true, label: 'G' },
  { id: 'assists', numeric: true, label: 'A' },
  { id: 'points', numeric: true, label: 'PTS' },
  { id: 'pim', numeric: true, label: 'PIM' },
  { id: 'gpg', numeric: true, label: 'G/GM' },
  { id: 'apg', numeric: true, label: 'A/GM' },
  { id: 'ppg', numeric: true, label: 'PTS/GM' },
  { id: 'pimpg', numeric: true, label: 'PIM/GM' },
];

const StatList = () => {
  const { loading, error, data } = useQuery(GET_STATS);

  if (loading) return 'loading...';
  if (error) return `error: ${error.message}`;

  const statData = data.stats.map(stat => {
    const {
      id,
      gamesPlayed,
      goals,
      assists,
      pim,
      playerByPlayer: { firstName, lastName },
      seasonBySeason: { year, season },
      teamByTeam: { name: team },
    } = stat;
    return createData(
      id,
      lastName,
      firstName,
      `${year} ${season}`,
      team,
      gamesPlayed,
      goals,
      assists,
      goals + assists,
      pim,
      (goals / gamesPlayed).toFixed(2),
      (assists / gamesPlayed).toFixed(2),
      ((goals + assists) / gamesPlayed).toFixed(2),
      (pim / gamesPlayed).toFixed(2)
    );
  });

  return (
    <EnhancedTable
      defaultOrder="desc"
      defaultOrderBy="ppg"
      enablePagination
      headCells={headCells}
      rows={statData}
      tableTitle="Player Statistics"
    />
  );
};

export default StatList;
export { GET_STATS };
