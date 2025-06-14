from qiskit import QuantumCircuit
import numpy as np
import hashlib

class QuantumSymbolicProcessor:
    def __init__(self):
        self.symbol_map = {}

    def encode_amplitude(self, symbols: list[str]) -> QuantumCircuit:
        num_qubits = len(symbols)
        qc = QuantumCircuit(num_qubits, num_qubits)

        for i, symbol in enumerate(symbols):
            hash_val = int(hashlib.sha256(symbol.encode('utf-8')).hexdigest(), 16)
            angle = (hash_val % (2**16)) / (2**16) * 2 * np.pi
            self.symbol_map[symbol] = {'qubit': i, 'encoding_angle': angle}
            qc.ry(angle, i)
        qc.measure(range(num_qubits), range(num_qubits))
        return qc

    def decode_amplitude(self, measurements: dict) -> dict[str, float]:
        symbol_confidence = {symbol: 0.0 for symbol in self.symbol_map}
        total_shots = sum(measurements.values())
        if total_shots == 0:
            return symbol_confidence
        for bitstring, counts in measurements.items():
            for symbol, info in self.symbol_map.items():
                q = info['qubit']
                if q < len(bitstring) and bitstring[len(bitstring)-1-q] == '1':
                    symbol_confidence[symbol] += counts / total_shots
        return symbol_confidence
