import pytest
from hydra_core import QuantumSymbolicProcessor

def test_encode_decode_smoke():
    proc = QuantumSymbolicProcessor()
    symbols = ["foo", "bar"]
    qc = proc.encode_amplitude(symbols)
    assert qc.num_qubits == 2
    # Fake measurement result for test
    counts = {"00": 512, "11": 512}
    scores = proc.decode_amplitude(counts)
    assert set(scores.keys()) == set(symbols)
    assert abs(sum(scores.values()) - 1.0) < 0.2O
