import Game from '../Game'

export default function (buildingId) {
    const base = Game.getCurrentBase()

    return base.buildings.indexOf(buildingId) !== -1
}