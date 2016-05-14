import React from 'react';
import map from 'lodash/map'
import isEmpty from 'lodash/isEmpty'

export default function renderStaticBuildingsRequirements(base, sBuilding, level, items, buildings) {
    return (
        <div>
            {sBuilding.requirements[level] && (
                <div>
                    {!isEmpty(sBuilding.requirements[level].resources) && (
                        <div>
                            <h2>Resources requirements</h2>
                            { map(sBuilding.requirements[level].resources, (count, id) => (
                                <div key={id} className={base.inventory.RESOURCE[id].count < count && "color-error"}>
                                    {items[id].name} : {count}
                                </div>
                            ))}
                        </div>
                    )}
                    {!isEmpty(sBuilding.requirements[level].items) && (
                        <div>
                            <h2>Items requirements</h2>
                            { map(sBuilding.requirements[level].items, (resource, index) => (
                                <div key={index}>
                                    {items[resource.id].name} : {resource.count}
                                </div>
                            ))}
                        </div>
                    )}
                    {!isEmpty(sBuilding.requirements[level].buildings) && (
                        <div>
                            <h2>Buildings requirements</h2>
                            { map(sBuilding.requirements[level].buildings, (resource, index) => (
                                <div key={index}>
                                    {buildings[resource.id].name} level {resource.level}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ) || (
                <div>
                    No requirements
                </div>
            )}
        </div>
    )
}