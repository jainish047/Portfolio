import { ProjectType } from '@/data/projectList';
import {create} from 'zustand';

type projectState = {
    selectedProject:ProjectType | null;
    setSelectedProject: (project: ProjectType | null) => void;
}

export const useSelectedProjectStore = create<projectState>((set) => ({
    selectedProject: null,
    setSelectedProject: (project) => set({ selectedProject: project }),
}));