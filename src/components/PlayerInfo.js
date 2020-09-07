import React from 'react';
import PropTypes from 'prop-types';
import { useQuery, gql } from '@apollo/client';
import PageContainer from '../components/Layout/PageContainer';
import EnhancedTable from '../components/EnhancedTable';

const GET_PLAYER_INFO = gql`
  query($playerId: Int!) {
    players(where: { id: { _eq: 1 } }) {
      firstName
      lastName
      position
      gbhpc
      stats {
        assists
        gamesPlayed
        goals
        id
        pim
        seasonBySeason {
          season
          year
          league
        }
        teamByTeam {
          name
          color
          champion
        }
      }
    }
  }
`;

function createData(
  id,
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
  pimpg,
  league
) {
  return {
    id,
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
    league,
  };
}

const headCells = [
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
  { id: 'league', numeric: false, label: 'League' },
];

const PlayerInfo = props => {
  const { id } = props;
  const playerId = Number(id);
  const { loading, error, data } = useQuery(GET_PLAYER_INFO, {
    variables: { playerId },
  });

  if (loading) return 'loading...';
  if (error) return `error: ${error.message}`;

  console.log(data);

  const { firstName, lastName, position, gbhpc, stats } = data.players[0];

  const statData = stats.map(stat => {
    const {
      id: statId,
      gamesPlayed,
      goals,
      assists,
      pim,
      seasonBySeason: { year, season, league },
      teamByTeam: { name: team, color },
    } = stat;
    return createData(
      statId,
      `${year} ${season}`,
      `${team}${color ? ` (${color})` : ''}`,
      gamesPlayed,
      goals,
      assists,
      goals + assists,
      pim,
      (goals / gamesPlayed).toFixed(2),
      (assists / gamesPlayed).toFixed(2),
      ((goals + assists) / gamesPlayed).toFixed(2),
      (pim / gamesPlayed).toFixed(2),
      league
    );
  });

  return (
    <PageContainer>
      <div>
        <h3>
          {firstName} {lastName}
        </h3>
        <p>{position}</p>
      </div>
      <EnhancedTable
        defaultOrder="desc"
        defaultOrderBy="ppg"
        enablePagination
        headCells={headCells}
        rows={statData}
        tableTitle="Player Statistics"
      />
    </PageContainer>
  );
};

PlayerInfo.propTypes = {
  playerId: PropTypes.number,
};

PlayerInfo.defaultProps = {
  playerId: 1,
};

export default PlayerInfo;
export { GET_PLAYER_INFO };
