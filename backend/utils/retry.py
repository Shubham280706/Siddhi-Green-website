import time
import logging
from functools import wraps
from typing import Callable, Any

logger = logging.getLogger(__name__)


def with_retry(max_attempts: int = 3, delay: float = 1.0, backoff: float = 2.0):
    """Exponential backoff retry decorator."""
    def decorator(func: Callable) -> Callable:
        @wraps(func)
        def wrapper(*args, **kwargs) -> Any:
            current_delay = delay
            for attempt in range(1, max_attempts + 1):
                try:
                    return func(*args, **kwargs)
                except Exception as exc:
                    if attempt >= max_attempts:
                        logger.error(
                            "%s failed after %d attempts: %s",
                            func.__name__, max_attempts, exc,
                        )
                        raise
                    logger.warning(
                        "%s attempt %d/%d failed: %s – retrying in %.1fs",
                        func.__name__, attempt, max_attempts, exc, current_delay,
                    )
                    time.sleep(current_delay)
                    current_delay *= backoff
        return wrapper
    return decorator
