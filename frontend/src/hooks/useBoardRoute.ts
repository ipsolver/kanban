import { useNavigate, useParams } from 'react-router-dom';

export function useBoardRoute() {
  const { boardId } = useParams<{ boardId?: string }>();
  const navigate = useNavigate();

  const setBoardId = (id: string | null) => {
    if (!id) {
      navigate('/');
    } 
    else {
      navigate(`/${id}`);
    }
  };

  return {
    boardId: boardId ?? null,
    setBoardId,
  };
}
