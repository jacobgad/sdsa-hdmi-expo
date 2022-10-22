import { Port, stDemianaPorts, stJohnPorts } from './ports';

export type Building = 'demiana' | 'john';

function getPorts(building: Building): Port[] {
	if (building === 'demiana') return stDemianaPorts;
	if (building === 'john') return stJohnPorts;
	throw new Error('valid building not provided');
}

export function setAllPortsOff(building: Building): string {
	const values = getPorts(building).map((port, idx) => {
		if (port.mode === 'input') return `m${idx}=${port.value}`;
		return `m${idx}=0`;
	});
	const payload = values.join('&');
	return payload;
}

export function setAllToInput(portNumber: number, building: Building) {
	const outputValueSum = getPorts(building).reduce((pre, cur) => {
		if (cur.mode === 'output') return pre + cur.value;
		return pre;
	}, 0);
	const values = getPorts(building).map((port, idx) => {
		if (port.mode === 'output') return `m${idx}=0`;
		if (port.number === portNumber)
			return `m${idx}=${port.value + outputValueSum}`;
		return `m${idx}=${port.value}`;
	});
	return values.join('&');
}

export function getBuildingUrl(building: Building): string {
	if (building === 'demiana') return 'http://192.168.168.100/cgi/cam_vlan.cgi';
	if (building === 'john') return 'http://192.168.168.200/cgi/cam_vlan.cgi';
	throw new Error('valid building not provided');
}
