import React from 'react';

export default function renderStaticBuildingsRequirements(sBuilding, level, items, buildings) {
    return (
        <div>
            {sBuilding.requirements[level] && (
                <div>
                    {sBuilding.requirements[level].resources.length > 0 && (
                        <div>
                            <h2>Resources requirements</h2>
                            {sBuilding.requirements[level].resources.map((resource, index) => (
                                <div key={index}>
                                    {items[resource.id].name} : {resource.count}
                                </div>
                            ))}
                        </div>
                    )}
                    {sBuilding.requirements[level].items.length > 0 && (
                        <div>
                            <h2>Items requirements</h2>
                            { sBuilding.requirements[level].items.map((resource, index) => (
                                <div key={index}>
                                    {items[resource.id].name} : {resource.count}
                                </div>
                            ))}
                        </div>
                    )}
                    {sBuilding.requirements[level].buildings.length > 0 && (
                        <div>
                            <h2>Buildings requirements</h2>
                            { sBuilding.requirements[level].buildings.map((resource, index) => (
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