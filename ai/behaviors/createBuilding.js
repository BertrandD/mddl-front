import * as buildingActionTypes from '../../core/actionTypes/BuildingActionTypes';

import { register } from '../eventHandler'
import Game from '../Game'
import logger from '../logger'

logger.warn("################################ test !!! << -- this line should appear only 1 time !!")

register(buildingActionTypes.CREATE_BUILDING_START, (action) => {
    logger.log("Great ! My building is under construction !");
    const endsAt = action.payload.building.endsAt;
    logger.debug("endsAt="+endsAt);
    const buildingId = action.payload.building.id;
    logger.debug("buildingId="+buildingId);
    const wait = endsAt - Date.now();
    logger.log("I'll wait " + wait + "ms...");
    setTimeout(() => {
        logger.log("OK. Now my buildings should be available.");
        const check = Game.store.getState().entities.buildings[buildingId].endsAt;
        if (check <= 0 ) {
            logger.log("Perfect ! ")
        } else {
            logger.log("Hum... check="+check);
        }
    }, wait);
});


register(buildingActionTypes.CREATE_BUILDING_END, (action) => {
    const building = action.payload.building;
    logger.log(building.buildingId+" (lvl " + (building.currentLevel+1) + ") is available !")
});

register(buildingActionTypes.UPGRADE_BUILDING_END, (action) => {
    const building = action.payload.building;
    logger.log(building.buildingId+" (lvl " + (building.currentLevel+1) + ") is available !")
});

export default function (buildingId) {
    const sBuildings = Game.getStaticBuildings()

    Game.actions.createBuilding(Game.getCurrentBase(), sBuildings[buildingId]).catch((e) => {
        logger.error("Something went wrong... I canot build a " + buildingId + "... Error is : " );
        logger.error(e);
    });

}