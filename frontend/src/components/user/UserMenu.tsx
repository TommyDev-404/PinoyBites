import { User, LogOut, Moon, } from 'lucide-react';
import {
      DropdownMenu,
      DropdownMenuTrigger,
      DropdownMenuContent,
      DropdownMenuItem,
      DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch"; // assuming you have a switch component
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useModal } from '@/context/modal.context';
import { useAuth } from '@/context/auth.context';


export default function UserMenu() {
      const { logout } = useAuth();
      const { setModalOpen } = useModal();

      const [darkMode, setDarkMode] = useState(false);

      const toggleDarkMode = () => setDarkMode(!darkMode);

      const handleLogout = () => {
            setModalOpen({ 
                  modalToOpen: 'logoutConfirmation',
                  message: 'Are you sure you want to logout? You will be signed out after this.',
                  actionName: 'Logout',
                  function: logout
            });
      };

      return (
            <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-white flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 cursor-pointer overflow-hidden relative">
                              <User size={28} className="text-white" />
                        </div>
                  </DropdownMenuTrigger>
            

                  <DropdownMenuContent  align="end" className="w-52">
                        {/* Account Section */}

                        <p className="px-4 py-1 text-xs text-stone-400">Personal</p>

                        <DropdownMenuItem asChild className="cursor-pointer py-3">
                              <NavLink to="/account" className="flex items-center w-full justify-between">
                                    <div className="flex items-center">
                                          <User className="w-4 h-4 mr-4" /> Account
                                    </div>
                              </NavLink>
                        </DropdownMenuItem>
                        
                        <DropdownMenuSeparator />

                        {/* Preferences Section */}
                        <p className="px-4 py-1 text-xs text-stone-400">Preferences</p>
            
                        <DropdownMenuItem className='py-3'>
                              <div onClick={(e) => e.stopPropagation()} className='w-full cursor-pointer flex items-center justify-between'>
                                    <div  className="flex items-center">
                                          <Moon className="w-4 h-4 mr-4" />
                                          Dark Mode
                                    </div>
                                    <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
                              </div>
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        {/* Logout */}
                        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-500 py-3">
                              <LogOut className="w-4 h-4 mr-4" /> Logout
                        </DropdownMenuItem>
                  </DropdownMenuContent>
            </DropdownMenu>
      );
}