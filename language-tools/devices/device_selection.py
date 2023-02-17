from torch import cuda, backends, device

# Gets the most performant device, starting with CUDA, then MPS, then CPU.
def get_most_performant_device():
  if cuda.is_available():
    return cuda.current_device()
  elif backends.mps.is_available():
    return device("mps")
  else:
    return device("cpu")
