export interface MockedModule<T = undefined> {
	unmock: () => void;
	data: T;
}
