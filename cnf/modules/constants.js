const zoo = ["alpacas", "bears", "crocodiles", "dingos", 
			"elephants", "frogs", "giraffes", "hippos"]
const adopt = ["Alfonzo", "Beanie", "Cookie-Crisp", "Dynamite", 
			"Edward", "Fiercesome", "Giant", "Hayfever"]
const OS = ["Android", "Fedora", "iOS", "macOS", 
		"Raspberry Pi OS", "SUSE Linux", "Ubuntu", "Windows"]
		
const alphabet1 = ["a", "b", "c", "d", "e", "f", "g", "h"];
const alphabet2 = ["a", "f", "i", "m", "r", "s", "u", "w"];

function zooMission(qualifier, number) {
    if (number == 1) {
        return `I visited ${qualifier} 1 animal at the zoo.`;
    } else {
        return `I visited ${qualifier} ${number} animals at the zoo.`;
    }
}

function adoptionMission(qualifier, number) {
    if (number == 1) {
        return `I adopted ${qualifier} 1 cat.`;
    } else {
        return `I adopted ${qualifier} ${number} cats.`;
    }
}

function osMission(qualifier, number) {
    if (number == 1) {
        return `I am running ${qualifier} 1 operating system.`;
    } else {
        return `I am running ${qualifier} ${number} operating systems.`;
    }
}

export const setup = [zoo, adopt, OS];
export const alphabets = [alphabet1, alphabet1, alphabet2];
export const missions = [zooMission, adoptionMission, osMission];
export const variableSentence = [(x) => `I visited the ${x}`, (x) => `I adopted the cat ${x}`, (x) => `I have a computer running ${x}`];
